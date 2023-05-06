'use client'
import { PropfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
    user: PropfileUser;
}

export default function FollowButton({user}: Props) {
    const {username} = user;
    const {user: loggedInUser, toggleFollow} = useMe();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    //isFetching이 버튼이 클릭되고 함수가 작동 중일 때 중복 클릭을 막는 역할을 한데.
    const isUpdating = isPending || isFetching;

    const showButton = loggedInUser && loggedInUser.username !== username;
    const following = 
        loggedInUser && 
        loggedInUser.following.find(item => item.username === username);

    const text = following? 'Unfollow' : 'Follow';

    const handleFollow = async () => {
        setIsFetching(true);
        await toggleFollow(user.id, !following);
        setIsFetching(false);
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <>
            {showButton && 
                <div className='relative'>
                    {isUpdating && (
                        <div className='absolute z-20 inset-0 flex justify-center items-center'>
                            <PulseLoader size={6}/>
                        </div>
                    )}
                    <Button
                        disabled={isUpdating}
                        text={text} 
                        onClick={handleFollow} 
                        red={text === 'Unfollow'}
                    />
                </div>
            } 
        </>
    );
}