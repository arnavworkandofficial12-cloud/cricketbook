const Errorscreenmessage = ({ message }) => {
    if (message == null) {
        return null;
    }
    else {
        return (<>
            <div className="Errormessage">
                {message}
            </div>
        </>)
    }
}
export default Errorscreenmessage