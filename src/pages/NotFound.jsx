import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
export default function NotFound() { return <><PageIntro eyebrow="404" title="This colour is out of range." description="The page you are looking for does not exist." /><div className="mx-auto max-w-7xl px-6 pb-20 md:px-10"><Link className="font-semibold text-signal" to="/">Return home →</Link></div></> }
