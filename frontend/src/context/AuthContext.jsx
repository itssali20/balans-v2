import React,{createContext,useContext,useEffect,useState}from'react'
import{createClient}from'@supabase/supabase-js'
export const supabase=createClient(process.env.REACT_APP_SUPABASE_URL,process.env.REACT_APP_SUPABASE_ANON_KEY)
const AuthContext=createContext({})
export const AuthProvider=({children})=>{
  const[user,setUser]=useState(null)
  const[profile,setProfile]=useState(null)
  const[loading,setLoading]=useState(true)
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setUser(session?.user??null)
      if(session?.user)fetchProfile(session.user.id)
      else setLoading(false)
    })
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      setUser(session?.user??null)
      if(session?.user)fetchProfile(session.user.id)
      else{setProfile(null);setLoading(false)}
    })
    return()=>subscription.unsubscribe()
  },[])
  const fetchProfile=async(id)=>{
    const{data}=await supabase.from('profiles').select('*').eq('id',id).single()
    setProfile(data);setLoading(false)
  }
  const signIn=async(email,password)=>supabase.auth.signInWithPassword({email,password})
  const signOut=async()=>{await supabase.auth.signOut();setUser(null);setProfile(null)}
  return<AuthContext.Provider value={{user,profile,loading,signIn,signOut}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext)
