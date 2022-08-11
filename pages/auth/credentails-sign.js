import { getCsrfToken } from "next-auth/react"
import Link from "next/link"

export default function SignIn({ csrfToken }) {
  return (
    <section className="h-full bg-gray-200 gradient-form md:h-screen">
      <div className="h-full px-6 py-12 ">
        <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6">
          <div className="xl:w-10/12">
            <div className="block bg-white rounded-lg shadow-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="px-4 lg:w-6/12 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                    <img
                      className="w-48 mx-auto"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      alt="logo"
                    />
                    <h4 className="pb-1 mt-1 mb-12 text-xl font-semibold">We are The Lotus Team</h4>
                    </div>
                    <form method="post" action="/api/auth/callback/credentials">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          name="email"
                          type="email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          name="password"
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                        />
                      </div>
                      <div className="pt-1 pb-1 mb-12 text-center">
                        <button
                          className="login_button inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Log in
                        </button>
                        <a className="text-black-600">Forgot password?</a>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <Link href={"/contact"}>
                          <button
                            className="inline-block px-6 py-2 text-xs font-medium leading-tight text-red-600 uppercase transition duration-150 ease-in-out border-2 border-red-600 rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Sing Up
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center rounded-b-lg login_button lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                  <div className="px-4 py-6 text-white md:p-12 md:mx-6">
                    <h4 className="mb-6 text-xl font-semibold">We are more than just a company</h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}