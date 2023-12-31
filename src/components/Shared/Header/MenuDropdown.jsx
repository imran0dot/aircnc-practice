import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import { Link } from 'react-router-dom'
import ModalHost from './ModalHost'

const MenuDropdown = ({ SetLoginFun }) => {
  const { setLogin } = SetLoginFun
  const { user, logOut, host } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  let [isModal, setIsModal] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        {user && !host? <button 
          disabled = {!user}
          onClick={() => setIsModal(true)}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
            AirCNC your home
          </button> : <></>}
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
              to='/'
              className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
            >
              Home
            </Link>
            {user ? (
              <div>
                <div
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                >
                  <Link to="/dashboard">Dashboard</Link>
                </div>

                <div
                  onClick={logOut}
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'>
                  Logout</div>
              </div>
            ) : (
              <>
                <Link
                  to='/login'
                  onClick={() => setLogin(true)}
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Login
                </Link>
                <Link
                  onClick={() => setLogin(false)}
                  to='/login'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
        <ModalHost isModal={isModal} setIsModal={setIsModal} />
    </div>
  )
}

export default MenuDropdown