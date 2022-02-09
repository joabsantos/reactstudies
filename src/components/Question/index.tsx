import { ReactNode } from 'react';
import cx from 'classnames';
import './styles.scss';


type QuestionsProps = {
    content: string,
    author: {
        name: string;
        avatar: string;
    },
    children?: ReactNode,
    isAnswered?: boolean,
    isHighlighted?: boolean
}

export function Question({ content, author, children, isAnswered = false, isHighlighted = false }: QuestionsProps) {
    return (
        <div className={cx("question",
            {
                answered: isAnswered,
                highlighted: isHighlighted
            })
        }>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}