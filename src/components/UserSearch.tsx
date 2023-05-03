'use client';
import { ProfileUser } from '@/model/user';
import {FormEvent, useState} from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';
import Avatar from './Avatar';

export default function UserSearch() {
    const [keyword, setKeyword] = useState('');
    const {
        data: users, 
        isLoading, 
        error
    } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return(
        <section className='w-full max-w-2xl my-4 flex flex-col items-center'>
            <form className='w-full mb-4' onSubmit={onSubmit}>
                <input
                    className='w-full text-xl p-3 outline-none border border-gray-400'
                    type="text" 
                    autoFocus 
                    placeholder='Search for a username or name' 
                    value={keyword} 
                    onChange={e => setKeyword(e.target.value)}/>
            </form>
            {error && <p>something went wrong</p>}
            {isLoading && <GridSpinner/>}
            {!isLoading && !error && users?.length === 0 && <p>There is no such a user</p>}
            <ul className='w-full p-4'>
                {users && users.map(user => 
                    <li key={user.username}>
                        <UserCard user={user}/>
                    </li>    
                )}
            </ul>
        </section>
    );
}