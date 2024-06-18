
export default function Account(){
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    return(
        <>
       <div>
        {loggedInUser && (
        <div>
          <p>Welcome, {loggedInUser.fname} {loggedInUser.lname} ({loggedInUser.username})!</p>
          <p>Email: {loggedInUser.email}</p>
          <p>Age: {loggedInUser.age}</p>
          <p>Status: {loggedInUser.statusem}</p>
        </div>
      )}
        </div>
       
        </>
    )
}