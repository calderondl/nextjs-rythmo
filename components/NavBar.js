import Link from 'next/link';
import ActiveLink from './ActiveLink'

export default function NavBar(){    
    return(
        <header>
            <nav className='flex bg-orange-300 rounded-xl shadow-md overflow-hidden p-4 justify-between'>
                <div className='font-bold hover:text-white text-xl'>
                <Link href='/'>Home</Link>
                </div>                
                <ul className='flex gap-4 text-lg'>
                    <ActiveLink href='/atletas'>Atletas</ActiveLink>
                    <ActiveLink href='/estadisticas'>Estadísticas</ActiveLink>
                    <ActiveLink href='/login'>Login</ActiveLink>
                </ul>
            </nav>
        </header>
    );
}