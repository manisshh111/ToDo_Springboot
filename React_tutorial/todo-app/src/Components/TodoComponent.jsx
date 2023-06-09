import {BrowserRouter, Routes, Route, useNavigate, Navigate, useParams, Link} from "react-router-dom";
import {retrieveTodoApi} from './todo/api/TodoApiService'
import { useAuth } from "./todo/security/AuthContext";
import { useEffect, useState } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
export default function TodoComponent(){

    const {id} = useParams();
    console.log(id);

    const[description, setDescription] = useState('');
    const[targetDate, setTargetDate] = useState('');

    const authContext= useAuth();
    const usernameFromAuthContext= authContext.usernameAuthContext;
    console.log(usernameFromAuthContext);

    useEffect(
        ()=> retrieveTodos(),
        [id]
    )


    function retrieveTodos(){
        retrieveTodoApi(usernameFromAuthContext, id)
        .then((response)=>{
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
        })
          .catch(error=>console.log(error))
          .finally(()=>console.log('CleanUp'));
    }

    useEffect(
        ()=> retrieveTodos(),
        [id]
    )

    function onSubmit(values){
        console.log(values);
    }

    function validate(values){
        let errors= {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid Target Date'
        };
        console.log(values);
        if(values.description.length<5){
        errors.description= 'Enter atleast 5 characters'
        }

        if(values.targetDate==null){
            errors.description= 'Enter a target date'
            }
        return errors;
    }


    return (
        <>
        <div className="container">
            <h1>Enter Todo Details:-</h1>
            <div>
                <Formik initialValues= {{description, targetDate}} 
                enableReinitialize = {true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur= {false}
                
                >
                  {
                    (props) =>(
                        <Form >
                            <ErrorMessage
                               name="description"
                               component="div"
                               className="alert alert-warning"
                            />
                             <ErrorMessage
                               name="targetDate"
                               component="div"
                               className="alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type= "text" className="form-control" name= "description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type= "date" className="form-control" name="targetDate"/>
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                  }
                 </Formik>

            </div>
        </div>
        </>
    )
}