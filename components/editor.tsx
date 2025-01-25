import React from 'react'
import BasicDetails from './basic-details'
import { Separator } from '@/components/ui/separator'
import PlatformToggle from './ui/platform-toggle'

export default function Editor() {
  return (
    <div className="space-y-6">
      <BasicDetails />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlatformToggle
          title="GitHub Contributions"
          description="Show your GitHub contributions chart on your portfolio. Please ensure that your GitHub ID is entered in the basic information card above too."
          platform="github"
        />
        <PlatformToggle
          title="Product Hunt Showcase"
          description="Show your Product Hunt launches and achievements on your portfolio. Please ensure that your Product Hunt username is entered in the basic information card above too."
          platform="producthunt"
        />
        <PlatformToggle
          title="Dev.to Articles"
          description="Show your Dev.to articles on your portfolio. Please ensure that your Dev.to username is entered in the basic information card above too."
          platform="devto"
        />
        <PlatformToggle
          title="Medium Articles"
          description="Show your Medium articles on your portfolio. Please ensure that your Medium username is entered in the basic information card above too."
          platform="medium"
        />
      </div>
    </div>
  )
}