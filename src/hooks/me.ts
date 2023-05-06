import { useCallback } from 'react';
import { HomeUser } from "@/model/user";
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
    return fetch('api/bookmarks', {
        method: 'PUT',
        body: JSON.stringify({id: postId, bookmark}),
    }).then((res) => res.json());
}

export default function useMe() {
    const {data: user, isLoading, error, mutate} = useSWR<HomeUser>('/api/me')
    const setBookmark = useCallback(
        (postId: string, bookmark: boolean) => {
            if(!user) return;
            const bookamrks = user.bookmarks;
            const newUser = {
                ...user,
                bookmarks: bookmark ? [...bookamrks, postId] : bookamrks.filter(b => b!==postId)
            }
    
            return mutate(updateBookmark(postId, bookmark), {
                optimisticData: newUser,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            })
        },[user, mutate]
    );

    return {user, isLoading, error, setBookmark};
}