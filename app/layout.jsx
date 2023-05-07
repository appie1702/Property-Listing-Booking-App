import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import Navbar from './components/navbar/Navbar'
import ToasterProvider from './components/providers/ToasterProvider'
import {Nunito} from "next/font/google"
import './globals.css'
import SearchModal from './components/modals/SearchModal'
import getCurrentUser from './actions/getCurrentUser'

export const metadata = {
  title: 'Homify',
  description: 'Homify',
  icons: {
    icon: '/logo.png',
  },
}


const font = Nunito({
  subsets:["latin"]
})

export default async function RootLayout({children}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RentModal/>
          <SearchModal/>
          <LoginModal/>
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}</body>
    </html>
  )
}
