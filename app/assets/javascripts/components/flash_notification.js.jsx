window.FlashNotificationList = React.createClass({
  render: function () {
    return (
      <ul className='flash-notification-list'>
        {
          this.props.notifications.map(function(notification, idx) {
            return (
              <li key={idx} className='flash-notification'>
                <span className='glyphicon glyphicon-ok'></span>
                {notification}
              </li>
            );
          })
        }
      </ul>
    )
  }
})
