import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../components/Layout/index';
import {HomePage} from '../pages/HomePage';
import {RegisterPage} from '../pages/RegisterPage';
import {LoginPage} from '../pages/LoginPage';
import {DetailPost} from '../pages/PostComment';
import {CreatePostPage} from '../pages/CreatePostPage';
import {SearchPage} from '../pages/SearchPage';
import {UserPage} from '../pages/UserPage';
import {SettingPage} from '../pages/SettingPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/detail-page/:id',
                element: <DetailPost />,
            },
            {
                path: '/create',
                element: <CreatePostPage />,
            },
            {
                path: '/search/:value',
                element: <SearchPage />,
            },
            {
                path: '/user/:idUser',
                element: <UserPage />,
            },
            {
                path: '/setting',
                element: <SettingPage />,
            },
        ],
    },
]);