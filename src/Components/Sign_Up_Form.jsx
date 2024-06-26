import { useState } from "react"
import Swal from "sweetalert2";
import "./Sign_Up_Form.modules.css"

let initial = {
    fname : "",
    lname : "",
    email : "",
    pw : ""
}

const Sign_Up_Form = ()=>{

    const [main,setMain] = useState(true);

    const [state,setState] = useState(initial);
    const [arr,setArr] = useState([]);

    
    const [lnamefield,setLnamefield] = useState(true)
    const [emailerror,setEmailerror] = useState("");
    const [passwordError,setPasswordError] = useState("");

    const get_Value_By_Input = (val)=>{
        let {name,value} = val.target;

        setState({...state,[name]:value});
    }
    
    const form_Submit = (val)=>{
        val.preventDefault()
        if(!emailerror && !passwordError)
        {
            setArr([...arr,state]);
            setState(initial);

            Swal.fire({
                title: 'Success!',
                text: 'Your data has been successfully submitted.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setMain(false);
        }
    }
    const loginFormSubmit = ()=>{

    
            // const loginUser = arr.find(loginUser => loginUser.email === state.email && loginUser.pw === state.pw)

            const user = arr.find((user)=>{
                if(user.email === state.email && user.pw === state.pw)
                    {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Your data matches successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }
                    else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'Email or password does not match.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
            })
            // if(loginUser)
            // {
            //     Swal.fire({
            //         title: 'Success!',
            //         text: 'Your data matches successfully.',
            //         icon: 'success',
            //         confirmButtonText: 'OK'
            //     });
            // }
            // else{
            //     Swal.fire({
            //         title: 'Error!',
            //         text: 'Email or password does not match.',
            //         icon: 'error',
            //         confirmButtonText: 'OK'
            //     });
            // }
    }
    
    console.log(arr);

    const handleFocus = (e)=>{
        const {name} = e.target;

        console.log(name);

        if(name === "lname")
        {
            setLnamefield(true)
        }
        if(name === "email")
        {
            setEmailerror("")
        }
        if(name === "pw")
        {
            setPasswordError("")
        }
        
    }

    const lname_Blur = ()=>{
        if(state.lname === state.fname)
        {
            setLnamefield(false)
        }
        else{
            setLnamefield(true)
        }
    }

    const email_Blur = () =>{
        const emailRejex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRejex.test(state.email))
        {
            setEmailerror("*Invalid Email Address...")
        }
        else{
            setEmailerror("");
        }
    }
    const password_Blur = ()=>{
        const passwordRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if(!passwordRejex.test(state.pw))
        {
            setPasswordError("*Password Must Be 8 Character and At least 1 Letter And 1 Number")
        }
        else{
            setPasswordError("");
        }
    }
  


    return(
        <>
            {
                main ? 
                <form id="sub" onSubmit={form_Submit}>
                <div style={{backgroundColor:"#53e553"}}>
                    <h1>Sign - Up Form</h1>
                </div>
                <div>
                    <label htmlFor="">Enter Your First Name</label>
                    <input type="text" required name="fname" value={state.fname} className="form-control" onChange={get_Value_By_Input} onFocus={handleFocus}/>
                </div>
                <div>
                    <label htmlFor="">Enter Your Last Name</label>
                    <input type="text" required name="lname" value={state.lname} className={`form-control ${lnamefield ? '' : 'error-border'}`} onChange={get_Value_By_Input} onBlur={lname_Blur} onFocus={handleFocus}/>
                    {!lnamefield && (
                        <p id="err">*Lastname and firstname is same (*not valid)</p>
                    )}
                </div>
                <div>
                    <label htmlFor="">Enter Your Email Address</label>
                    <input type="email" required name="email" value={state.email} className={`form-control ${emailerror ? 'error-border' : ''}`} onChange={get_Value_By_Input} onFocus={handleFocus} onBlur={email_Blur}/>
                    {emailerror && (
                        <p id="err">{emailerror}</p>
                    )
                    }
                </div>
                <div>
                    <label htmlFor="">Set Password</label>
                    <input type="password" required name="pw" value={state.pw} className={`form-control ${passwordError ? 'error-border' : ''}`} onChange={get_Value_By_Input} onFocus={handleFocus} onBlur={password_Blur}/>
                    {passwordError && (
                        <p id="err">{passwordError}</p>
                    )

                    }
                </div>
                <div><button className="btn">Sign - Up</button></div>
            </form> 
            
            : 

            <form id="sub">
                <div style={{backgroundColor:"#53e553"}}>
                    <h1>Login Form</h1>
                </div>
                <div>
                    <label htmlFor="">Enter Your Register Email</label>
                    <input type="email" required name="email" value={state.email} className={`form-control ${emailerror ? 'error-border' : ''}`} onChange={get_Value_By_Input} onFocus={handleFocus} onBlur={email_Blur}/>
                    {emailerror && (
                        <p id="err">{emailerror}</p>
                    )
                    }
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" required name="pw" value={state.pw} className={`form-control ${passwordError ? 'error-border' : ''}`} onChange={get_Value_By_Input} onFocus={handleFocus} onBlur={password_Blur}/>
                    {passwordError && (
                        <p id="err">{passwordError}</p>
                    )

                    }
                </div>
                <div><button className="btn" onClick={loginFormSubmit}>Login</button></div>
            </form>
            }
        </>
    )
}

export default Sign_Up_Form