import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";

const QuestionCard = (props) => {
    const { qData } = props;
    const { id, deficulty_level, question_type, question, option_a,option_b,option_c,option_d } = qData;
    const IMG_URL = "http://localhost:4000/uploads/";

    return (
        <div>
            <Card className="relative h-100  p-6 bg-gray-50 shadow-xl">
                <div className='p-2 text-lg text-cyan-700 flex  justify-between	'>
                    <h4>Question {id}</h4>
                    <h4 className="rounded-lg bg-gary-400">{deficulty_level}</h4>
                </div>
                <div>
                    {
                        question_type === 'Text' &&
                        <Card className="w-auto text-pretty  p-2">
                            <h2>{question}</h2>
                        </Card>
                    }
                    {
                        question_type === 'Image' &&
                        <Card className="w-80">
                            <img className="h-45" src={IMG_URL + question} alt="" />
                        </Card>
                    }
                </div>
                <CardBody>
                    <ul>
                        <li>
                            Option A - {option_a}
                        </li>
                        <li>
                            Option B - {option_b}
                        </li>
                        <li>
                            Option C - {option_c}
                        </li>
                        <li>
                            Option D - {option_d}
                        </li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    )
}

export default QuestionCard
