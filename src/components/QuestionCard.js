import React from 'react'
import { Card, CardBody, Dialog, DialogHeader, DialogBody, } from "@material-tailwind/react";

import EditQuestion from './EditQuestion';
const QuestionCard = (props) => {
    const { qData } = props;
    const { id, deficulty_level, question_type, question, option_a, option_b, option_c, option_d } = qData;
    const IMG_URL = "http://localhost:4000/uploads/";

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <div>
            <Card className="relative h-100  p-6 bg-gray-50 ">
                <div className='p-2 text-lg text-cyan-700 flex  justify-between	'>
                    <h4 className='cursor-pointer' onClick={handleOpen}>Question {id}</h4>
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
            <Dialog open={open} handler={handleOpen}  size='xl' className='rounded-lg'>
                <DialogHeader >
                    <div className='flex space-x-[910px] '>
                        <div>
                            <h5 className='text-cyan-600'>Edit Question{id}</h5>
                        </div>
                        <div className="cursor-pointer ">
                            <h5  onClick={handleOpen}>❌</h5>
                        </div>
                    </div>

                </DialogHeader>
                <DialogBody>
                    <EditQuestion editquestiondata={qData} />
                </DialogBody>
                {/* <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter> */}
            </Dialog>
        </div>
    )
}

export default QuestionCard
