class NotificationService {
  static showNotification({ title, message, type = 'info', duration = 3000 }) {
    // Create notification container if it doesn't exist
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.className = 'notification-container';
      notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background-color: ${this._getBackgroundColor(type)};
      color: ${this._getTextColor(type)};
      padding: 15px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
      max-width: 400px;
      animation: slideIn 0.3s ease forwards;
      opacity: 0;
      transform: translateX(100%);
    `;

    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    if (title) {
      const titleElement = document.createElement('h4');
      titleElement.style.cssText = `
        margin: 0 0 5px 0;
        font-size: 16px;
        font-weight: bold;
      `;
      titleElement.textContent = title;
      content.appendChild(titleElement);
    }
    
    const messageElement = document.createElement('p');
    messageElement.style.cssText = `
      margin: 0;
      font-size: 14px;
    `;
    messageElement.textContent = message;
    content.appendChild(messageElement);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = `
      background: none;
      border: none;
      color: inherit;
      font-size: 20px;
      cursor: pointer;
      margin-left: 10px;
      padding: 0;
    `;
    closeButton.addEventListener('click', () => this._removeNotification(notification));

    // Add content and close button to notification
    notification.appendChild(content);
    notification.appendChild(closeButton);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
    `;
    document.head.appendChild(style);

    // Add notification to container
    notificationContainer.appendChild(notification);

    // Auto remove after duration
    setTimeout(() => {
      this._removeNotification(notification);
    }, duration);

    return notification;
  }

  static _removeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    
    // Remove notification after animation completes
    setTimeout(() => {
      if (notification.parentElement) {
        notification.parentElement.removeChild(notification);
      }
    }, 300);
  }

  static _getBackgroundColor(type) {
    switch (type) {
      case 'success':
        return '#d4edda';
      case 'error':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'info':
      default:
        return '#d1ecf1';
    }
  }

  static _getTextColor(type) {
    switch (type) {
      case 'success':
        return '#155724';
      case 'error':
        return '#721c24';
      case 'warning':
        return '#856404';
      case 'info':
      default:
        return '#0c5460';
    }
  }
}

export default NotificationService; 