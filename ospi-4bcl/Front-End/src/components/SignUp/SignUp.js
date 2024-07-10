import React, { useState } from 'react';
import axios from 'axios';
import "./SignUp.css";

const SignUp = ({ setSignUp, setFfa }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState(['', '', '']);
    const [answers, setAnswers] = useState(['', '', '']);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const questions = [
        "What was your childhood best friend’s nickname?",
        "What is your sibling’s favourite movie?",
        "What is your neighbor’s last name?",
        "How many pets did you have at 10 years old?",
        "What is your favourite dessert?"
    ];

    const validate = () => {
        const newErrors = {};
        if (username.length < 3) newErrors.username = "Name must be at least 3 characters long.";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Invalid email address.";
        if (phone.length !== 10) newErrors.phone = "Phone number must be exactly 10 digits.";
        if (password.length < 3) newErrors.password = "Password must be at least 3 characters long.";
        answers.forEach((answer, index) => {
            if (answer.length < 3) newErrors[`answer${index}`] = `Answer must be at least 3 characters long.`;
        });
        return newErrors;
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...selectedQuestions];
        newQuestions[index] = event.target.value;
        setSelectedQuestions(newQuestions);
    };

    const handleAnswerChange = (index, event) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (new Set(selectedQuestions).size !== 3 || selectedQuestions.includes('')) {
            alert("Please select exactly 3 unique questions.");
            return;
        }

        const userDetails = {
            username,
            password,
            ans1: answers[0],
            ans2: answers[1],
            ans3: answers[2],
            phone_no: phone,
            SQ1: selectedQuestions[0],
            SQ2: selectedQuestions[1],
            SQ3: selectedQuestions[2],
            email_id: email
        };

        axios.post('http://localhost:3000/save', userDetails) // Ensure this URL is correct
            .then(response => {
                console.log(response.data);
                setSubmitted(true);
                setSignUp(false); // Set SignUp to false to hide the form
                setFfa(true); // Set Ffa to true to show the next form
            })
            .catch(error => {
                console.error('There was an error saving the data!', error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="left-side">
                        <label>
                            Name:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {errors.name && <p className="error">{errors.name}</p>}
                        </label><br /><br />
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </label><br /><br />
                        <label>
                            Phone Number:
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </label><br /><br />
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </label>
                    </div>
                    <div className="right-side">
                        {Array.from({ length: 3 }, (_, i) => (
                            <div key={i}>
                                <label>
                                    Select Question {i + 1}:
                                    <select onChange={(e) => handleQuestionChange(i, e)} value={selectedQuestions[i]}>
                                        <option value="" disabled>Select a question</option>
                                        {questions.map((question, index) => (
                                            <option key={index} value={question}>{question}</option>
                                        ))}
                                    </select>
                                </label><br /><br />
                                {selectedQuestions[i] && (
                                    <label>
                                        Answer:
                                        <input type="text" value={answers[i]} onChange={(e) => handleAnswerChange(i, e)} />
                                        {errors[`answer${i}`] && <p className="error">{errors[`answer${i}`]}</p>}
                                    </label>
                                )}
                                <br /><br />
                            </div>
                        ))}
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
                {submitted && (
                    <div className="success-message">
                        <h2>Data saved successfully!</h2>
                    </div>
                )}
            </header>
        </div>
    );
}

export default SignUp;
