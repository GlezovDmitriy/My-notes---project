import s from './Page404.module.css'
import Button from "@mui/material/Button";
import {Link, Navigate} from 'react-router-dom';
import {Link as RouterLink} from '@mui/material';
import {Path} from "common/router/router";
import {OverridableStringUnion} from "@mui/types";


const onClicktoMain = () => {
    return <Navigate to={Path.Main}/>
}
export const Page404 = () => {
    return (
        <>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subTitle}>page not found</h2>
            {/*<button onClick={onClicktoMain()}>
                НА ГЛАВНУЮ СТРАНИЦУ
            </button>*/}
            <div className={s.buttonOnMain}>
                <Button
                    component={Link}
                    to="/"
                    size = 'large'
                    color='primary'>
                    НА ГЛАВНУЮ СТРАНИЦУ
                </Button>
            </div>

        </>
    )
}