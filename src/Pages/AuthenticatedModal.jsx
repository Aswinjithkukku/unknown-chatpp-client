/* eslint-disable react/prop-types */

function AuthenticatedModal({
  submitAuthenticationHandler,
  username,
  setUsername,
}) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-[2px] bg-black/30 flex justify-center items-center ">
      <div className="bg-white rounded-xl py-5 px-10 w-full m-4 md:m-0 md:w-auto max-w-[800px] drop-shadow-2xl space-y-3">
        <p className="">Provide a username for the authentication</p>
        <form
          onSubmit={submitAuthenticationHandler}
          className="bg-gray-100 rounded-md p-4 space-y-3"
        >
          <div className="flex justify-center">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-11/12 bg-gray-200 shadow-round rounded text-gray-800 font-medium px-2 outline-none border border-gray-300 h-8 text-center"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-semibold bg-blue-600 rounded text-white px-4 py-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthenticatedModal;
