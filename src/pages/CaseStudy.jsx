import { useParams } from 'react-router-dom'

export default function CaseStudy() {
  const { id } = useParams()
  return <h1>Case Study: {id}</h1>
}