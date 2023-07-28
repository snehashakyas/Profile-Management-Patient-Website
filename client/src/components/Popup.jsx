function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <button className='btn-exit' onClick={() => props.setTrigger(false)}>X</button>
            <br></br>
            { props.children }
        </div>
    </div>
  ) : ""
}

export default Popup