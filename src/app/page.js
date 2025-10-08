'use client';

import withAuth from '@/utils/withAuth';
import CreatePost from '@/components/CreatePost';
import FeedList from '@/components/FeedList';
import useFeeds from '@/hooks/useFeeds';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
// import RightSidebar from '@/components/RightSidebar';

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeeds();

  return (
    <div className="bg-primary text-text-primary">
      <Navbar />
      <main className="pt-16 flex">
        <LeftSidebar />
        <div className="flex-grow flex justify-center px-4">
          <div className="w-full flex flex-col justify-center items-center max-w-xl lg:max-w-2xl">
            <CreatePost />
            <FeedList
              data={data}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(HomePage);
