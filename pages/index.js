import { getMiddlewareRouteMatcher } from 'next/dist/shared/lib/router/utils/middleware-route-matcher'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import Track from '../models/Track'

const spotifyInstance = new SpotifyWebApi();

export default function Home() {
  const [athletesOnLine, setAthletesOnLine] = useState(null)
  const [playlist, setPlaylist] = useState(null)
  let _usershist = []
  let buildPlayList = []
  const [users, setUsers] = useState(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    getUsers()
    loop()
  }, [])

  function loop() {
    setTimeout(() => {
      getUsers()
      loop()
    }, 4000)
  }

  async function getUsers() {
    await axios.post('api/getOnLineUsers', {})
      .then(function (response) {
        const _users = response.data
        if (_users.length != _usershist.length) {
          _usershist = _users
          setUsers(_users)
          const mapData = JSON.stringify([..._users])
          const spotifyids = JSON.parse(mapData).map(d => d.spotifyid);
          getAthletesOnLine(spotifyids)
          getPlaylist(_users)
        }
      })
  }

  async function getAthletesOnLine(_spotifyids) {
    await axios.post('api/getAthletesOnLine', {
      spotifyids: _spotifyids
    })
      .then(function (response) {
        const _atheltesOnLine = response.data
        setAthletesOnLine(_atheltesOnLine)
      })
  }

  async function getPlaylist(_users) {
    setLoad(true)    
    buildPlayList = []
    _users.map((user) => {
      spotifyInstance.setAccessToken(user.token)
      spotifyInstance.getNewReleases().then(_albums => {
        _albums.albums.items.map((album) => {
          spotifyInstance.getAlbumTracks(album.id).then(_tracks => {
            _tracks.items.map((track) => {              
              buildPlayList.push(new Track(album.images[2].url, track.name, track.artists[0].name))
            })
          })
        })
      })
    })
    
    for(let i = 0; i < buildPlayList.length; i++) {
      let j = Math.floor(Math.random() * (buildPlayList.length - 1))
      [buildPlayList[i], buildPlayList[j]] = [buildPlayList[j], buildPlayList[i]]
      console.log(i)
      console.log(j)
      console.log(buildPlayList[i])
      console.log(buildPlayList[j])
   }
    
    setPlaylist(buildPlayList)
    setTimeout(() => {
      setLoad(false)
    }, 2500)
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>RYTMO</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/icons8-r-32.png' />
      </Head>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>s
      </main> */}

      {/* <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer> */}

      <div className='md:block flex gap-x-2'>
        <div className='md:w-full w-2/3 h-96 overflow-y-auto shadow-xl'>
          {load ? (
            <div className='text-center'>
              <div role='status'>
                <svg className='inline mr-2 w-52 h-52 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                  <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              {users?.length > 0 ? (
                <div>
                  {playlist?.map((track, i) => (
                    <div key={i}>
                      {i == 0 ? (
                        <div className='p-2 border-b-2 h-24 flex bg-gradient-to-t from-orange-200 to-orange-100'>
                          <img src={track.image}></img>
                          <div className='flex items-center ml-4 gap-x-2'>
                            <h1 className='text-4xl'>{track.name}</h1>
                            <h1 className='text-4xl font-semibold'>{track.artist}</h1>
                          </div>
                        </div>
                      ) : (
                        <div className='p-2 border-b-2 h-14 flex'>
                          <img src={track.image}></img>
                          <div className='flex items-center ml-4 gap-x-2'>
                            <h1 className='text-xl'>{track.name}</h1>
                            <h1 className='text-xl font-semibold'>{track.artist}</h1>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h1>no reproducci??n</h1>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='md:w-full w-1/3 h-96 overflow-y-auto'>
          <h1 className=' font-semibold text-lg text-center bg-gradient-to-t from-orange-200 to-orange-100 p-3 rounded-lg'>Atletas en el gimnasio</h1>
          <div className='mt-2'>
            {athletesOnLine && athletesOnLine?.length > 0 ? (
              athletesOnLine?.map((athleteOnLine, i) => (
                <div className='border-b-2 p-2 flex  justify-between' key={i}>
                  <h1 className='font-semibold text-lg'>{athleteOnLine.nombre} {athleteOnLine.apellido}</h1>
                  <div className='flex items-center'>
                    <p className='text-sm'>{users.length > 0 ? users[i].ingreso.split('T')[1].split('.')[0] : null}</p>
                    {/* reloj */}
                  </div>
                </div>
              ))
            ) : (
              <div className='border-b-2 p-2'>
                <h1 className='font-semibold text-lg text-center'>N/A</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}