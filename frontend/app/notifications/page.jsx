"use client"
import { globalContext } from '@/context_api/globalContext'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { Bell, Check, Mail, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const getNotificationIcon = () => {
    // You can add more icons based on notification type
    switch(notification.type) {
      case 'message': return <Mail className="w-5 h-5 text-blue-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className={`
      group relative bg-white rounded-xl shadow-sm hover:shadow-md
      transition-all duration-200 overflow-hidden
      ${notification.isRead ? 'border border-gray-100' : 'border border-blue-100 bg-blue-50/30'}
    `}>
      <div className="p-4">
        <div className="flex gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm leading-5 ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
              {notification.message}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <time className="text-xs text-gray-500">
                {new Date(notification.date).toLocaleString("en", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </time>
              {!notification.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification._id)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  <Check className="w-3 h-3" />
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4" />
    <p className="text-sm text-gray-500">Loading notifications...</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-sm font-medium text-gray-900">No notifications</h3>
    <p className="mt-2 text-sm text-gray-500">
      You're all caught up! Check back later for new updates.
    </p>
  </div>
);

const NotificationsPage = () => {
  const { user, setUser } = useContext(globalContext);
  const router = useRouter();

  if (!user?.name) {
    return <LoadingState />;
  }

  const markAsRead = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/markasread`,
        { id, userId: user._id },
        { headers: { "Content-Type": "application/json" }}
      );

      if (res.data.res) {
        setUser(res.data.user);
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to mark notification as read');
    }
  };

  const sortedNotifications = user.notifications?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="max-w-2xl mx-auto px-4 pt-24 pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Stay updated with your latest activities and updates.
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {!sortedNotifications?.length ? (
          <EmptyState />
        ) : (
          sortedNotifications.map((notification, index) => (
            <NotificationItem
              key={notification._id || index}
              notification={notification}
              onMarkAsRead={markAsRead}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default NotificationsPage;