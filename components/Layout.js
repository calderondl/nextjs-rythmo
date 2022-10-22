import NavBar from "./NavBar";

export default function Layout({children}){
    return(
        <div className='max-w-7xl mx-auto lg:max-w-4xl pl-1 pr-1'>
            <NavBar />
            <h1 className='text-center font-extrabold text-transparent text-8xl md:text-7xl bg-clip-text bg-gradient-to-r from-orange-50 via-orange-400 to-orange-50'>RYTHMO</h1>
            <h3 className='text-center'>Sistema inteligente de música de fondo para <span className='font-bold inline-block'>El Gimnasio</span></h3>
            <div className='mt-12'>
                <main>{children}</main>
            </div>        
        </div>        
    );
}