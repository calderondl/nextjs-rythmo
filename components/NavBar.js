import Link from 'next/link';
import ActiveLink from './ActiveLink'

export default function NavBar() {
    return (
        <header>
            <nav className='flex bg-gradient-to-b from-orange-300 to-orange-200 rounded-xl shadow-md overflow-hidden p-4 justify-between'>
                <div className='w-9'>
                    <Link href='/'>
                        <img src='/icons8-página-principal-60.png' className='cursor-pointer'/>
                    </Link>
                </div>
                <ul className='flex gap-4 text-lg font-semibold items-center'>
                    <ActiveLink href='/atletas'>Atletas</ActiveLink>                    
                    <ActiveLink href='/login'>Login</ActiveLink>
                </ul>
            </nav>
        </header>
    );
}