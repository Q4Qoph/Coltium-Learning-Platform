// app/(dashboard)/instructor/discussions/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch('/api/instructor/discussions');
      const data = await response.json();
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/instructor/discussions/${selectedDiscussion.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      });
      setMessage('');
      fetchDiscussions();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedDiscussion(discussion)}
                >
                  <h3 className="font-medium">{discussion.title}</h3>
                  <p className="text-sm text-gray-500">
                    {discussion.unreadCount} unread messages
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-8">
          {selectedDiscussion ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedDiscussion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-y-auto">
                  {selectedDiscussion.messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <div className="flex items-center mb-2">
                        <span className="font-medium">{message.sender.name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="mt-4">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <Button type="submit" className="mt-2">
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Select a discussion to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}