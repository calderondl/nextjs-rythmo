import {useRouter} from 'next/router';
import Link from 'next/link';

export default function ActiveLink({children, href}){
    const router = useRouter()    
    let _className = 'hover:text-white'
    if (router.asPath === href)
    {
        _className += ' font-bold'
    }        
    return(
        <li className={_className}>
            <Link href={href}>{children}</Link>
        </li>
    );
}