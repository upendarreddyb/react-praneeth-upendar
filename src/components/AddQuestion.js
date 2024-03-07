import React, { useState } from 'react'
import { Select, Option, Checkbox, Textarea, Input, Button } from "@material-tailwind/react";
import { useFormik } from 'formik';
import axios from "axios";

const AddQuestion = () => {
    
    const [questiontype, setQuestionType] = useState(true);
    const setDropvalues = (type, val) => {
        console.log(type, val)
        if (val === 'Text') setQuestionType(true)
        if (val === 'Image') setQuestionType(false);
        formik.values[type] = val;
        formik.setFieldValue(formik.values[type], val);
    }

    const setFieldValues = (type, value) => {
        formik.values.file = Object.assign(value);
        formik.setFieldValue(formik.values.file, Object.assign(value));
        console.log("onchange", formik.values.file)
    }

    const formik = useFormik({
        initialValues: {
            qtype: '',
            question: '',
            file: null,
            subject: '',
            deficulty: '',
            gradelevel: [],
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
        },
        onSubmit: (values) => {
            console.log("submit file", values.file);
            const formData = new FormData();
            formData.append('qtype', values.qtype);
            formData.append('question', values.question);
            formData.append('file', values.file);
            formData.append('subject', values.subject);
            formData.append('deficulty', values.deficulty);
            formData.append('gradelevel', values.gradelevel);
            formData.append('optionA', values.optionA);
            formData.append('optionB', values.optionB);
            formData.append('optionC', values.optionC);
            formData.append('optionD', values.optionD);
            axios.post("http://localhost:4000/q/question", formData).then(res => {
                console.log(res)
                if (res.status === 200) {
                    console.log("success: " + res.data.msg)
                } else {
                    console.log("Error: " + res.data.msg)
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });


        },
        validate: (values) => {
            console.log("validate", values)
            let errors = {};
            if (!values.qtype) {
                errors.qtype = "Question Type Required";
            }
            if (!values.qtype === 'Image' && !values.question) {
                errors.question = "Image Required";
            }
            if (values.qtype === 'Text' && !values.question) {
                errors.question = "Question  Required";
            }

            if (!values.subject) {
                errors.subject = "Subject Required";
            }
            if (!values.deficulty) {
                errors.deficulty = "Deficulty Required";
            }
            if (!values.gradelevel) {
                errors.gradelevel = "Grade Required";
            }
            if (!values.optionA) {
                errors.optionA = "optionA Required";
            }

            if (!values.optionB) {
                errors.optionB = "optionB Required";
            }
            if (!values.optionC) {
                errors.optionC = "optionC Required";
            }
            if (!values.optionD) {
                errors.optionD = "optionD Required";
            }
            return errors;
        }
    });


    return (
        <div className="">
           
            <div className="bg-purple-200 h-16 shadow-xl" >
                <h2 className="text-white text-center py-5 font-bolt text-xl">Adding Question</h2>
            </div>
            <div className="w-10/12 mx-auto my-4  shadow-xl p-4 m-auto border-gray-200 ">
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 p-12">

                            <div className="grid grid-cols-12 gap-6">

                                <div className="col-span-3">
                                    <Select label="Select Question type" color="purple" onChange={e => { formik.handleChange(e); setDropvalues('qtype', e) }} name="qtype">
                                        <Option value="Text">Text</Option>
                                        <Option value="Image">Image</Option>
                                    </Select>
                                    <span className="text-red-800"> {formik.errors.qtype ? <div>{formik.errors.qtype}</div> : null}</span>
                                </div>
                                {
                                    questiontype &&
                                    <div className="col-span-9" >
                                        <Textarea label="Question" color="purple" name="question"  resize={true} onChange={formik.handleChange} />

                                        <span className="text-red-800"> {formik.errors.question ? <div>{formik.errors.question}</div> : null}</span>
                                    </div>
                                }
                                {
                                    questiontype ? false :
                                        <div className="col-span-9">

                                            <div className=" flex justify-center rounded-lg border border-dashed border-gray-900/25  py-5">
                                                <div className="text-center">
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input id="file-upload"
                                                                type="file"
                                                                name="file"
                                                                onChange={(event) => {
                                                                    console.log("f onchange", event.currentTarget.files[0])
                                                                    setFieldValues("file", event.currentTarget.files[0]);
                                                                }}
                                                            />
                                                        </label>
                                                        {/* <p className="pl-1">or drag and drop</p> */}
                                                    </div>
                                                    {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                                </div>
                                            </div>
                                            <span className="text-red-800"> {formik.errors.file ? <div>{formik.errors.file}</div> : null}</span>
                                        </div>
                                }

                            </div>

                            <div className="grid grid-cols-12 gap-6 py-2">

                                <div className="col-span-3 ">

                                    <Select label="Select Subject" color="purple" name="subject" onChange={e => { formik.handleChange(e); setDropvalues('subject', e) }} >
                                        <Option value="maths">Maths</Option>
                                        <Option value="physics">Physics</Option>
                                        <Option value="english">English</Option>
                                    </Select>
                                    <span className="text-red-800"> {formik.errors.subject ? <div>{formik.errors.subject}</div> : null}</span>



                                </div>

                                <div className="sm:col-span-3">

                                    <Select label="Select Deficulty Level" color="purple" name="deficulty" onChange={e => { formik.handleChange(e); setDropvalues('deficulty', e) }}>
                                        <Option value="hard">Hard</Option>
                                        <Option value="medium">Medium</Option>
                                        <Option value="easy">Easy</Option>
                                    </Select>
                                    <span className="text-red-800"> {formik.errors.deficulty ? <div>{formik.errors.deficulty}</div> : null}</span>
                                </div>


                            </div>

                            <div className="grid grid-cols-12 gap-6 py-2">
                                <div className="col-span-6">
                                    <div className="py-4">
                                        <h2>Grade Level</h2>
                                    </div>
                                    <div className=" flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                        <div className="text-center">
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <Checkbox color="blue" label="6" name="gradelevel" value="6" onChange={formik.handleChange} />
                                                <Checkbox color="blue" label="7" name="gradelevel" value="7" onChange={formik.handleChange} />
                                                <Checkbox color="blue" label="8" name="gradelevel" value="8" onChange={formik.handleChange} />

                                                <Checkbox color="blue" label="9" name="gradelevel" value="9" onChange={formik.handleChange} />
                                                <Checkbox color="blue" label="10" name="gradelevel" value="10" onChange={formik.handleChange} />
                                                <Checkbox color="blue" label="11" name="gradelevel" value="11" onChange={formik.handleChange} />
                                                <Checkbox color="blue" label="12" name="gradelevel" value="12" onChange={formik.handleChange} />
                                                <span className="text-red-800"> {formik.errors.gradelevel ? <div>{formik.errors.gradelevel}</div> : null}</span>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-6 py-2">
                                <div className="col-span-3">
                                    <h6>Enter Options</h6>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-6 py-2">
                                <div className="col-span-3">
                                    <Input color="purple" label="Option A" name="optionA" onChange={formik.handleChange} />
                                    <span className="text-red-800"> {formik.errors.optionA ? <div>{formik.errors.optionA}</div> : null}</span>
                                </div>

                                <div className="col-span-3">
                                    <Input color="purple" label="Option B" name="optionB" onChange={formik.handleChange} />
                                    <span className="text-red-800"> {formik.errors.optionB ? <div>{formik.errors.optionB}</div> : null}</span>
                                </div>
                                <div className="col-span-3">
                                    <Input color="purple" label="Option C" name="optionC" onChange={formik.handleChange} />
                                    <span className="text-red-800"> {formik.errors.optionC ? <div>{formik.errors.optionC}</div> : null}</span>
                                </div>
                                <div className="col-span-3">
                                    <Input color="purple" label="Option D" name="optionD" onChange={formik.handleChange} />
                                    <span className="text-red-800"> {formik.errors.optionD ? <div>{formik.errors.optionC}</div> : null}</span>
                                </div>


                            </div>

                            <div className="grid grid-cols-6 gap-6 py-8 text-center">
                                <div className="col-span-6">
                                    <h6> <Button type="submit" className="rounded-full" disabled={!(formik.isValid && formik.dirty)}>Submit</Button></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </div >

        </div >
    )
}

export default AddQuestion
