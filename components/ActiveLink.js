import {useRouter} from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export default function ActiveLink({children, href}){
    const router = useRouter()       
    return(
        <li className={router.asPath === href ? 'hover:underline font-bold' : 'hover:underline'}>
            <Link href={href}>{children}</Link>
        </li>
    );
}