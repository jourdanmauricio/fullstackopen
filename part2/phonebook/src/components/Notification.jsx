const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type === 'success' ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}
export default Notification
