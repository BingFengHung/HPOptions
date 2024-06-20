import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'
import OptionRule from './utilities/OptionRule.ts';
import type { FormData } from './types/FormData.ts'


function App() {
  const [formData, setFormData] = useState<FormData>({ key: '', no: 0})
  const [generate, setGenerate] = useState('')
  
  const optionRule = new OptionRule();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    const {key, no} = formData
    const nValue = no; 
    const nValuePadded = nValue.toString().padStart(7, '0'); 
    const code8 = `A${nValuePadded}`;
      
    const newKey = optionRule.BackSort(key)
    const decode = optionRule.Intro(code8, newKey);
    setGenerate(decode)
  }
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="key">KEY：</label>
        <input id="key" name="key" type="text" value={formData.key} onChange={handleInputChange} required></input>
        <br></br>
        
        <label htmlFor="key">NO：</label>
        <input id="no" name="no" type="number" value={formData.no} onChange={handleInputChange} required></input>
        <br></br>
        
        <button type="submit">Generate</button>
      </form>
      
      <div>{generate}</div>
    </>
  )
}

export default App
