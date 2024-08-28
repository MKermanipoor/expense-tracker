import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ChipsProps extends React.HTMLAttributes<HTMLDivElement>{
    children: ReactNode
    color?: string
}

const Chips: React.FC<ChipsProps> = ({ children, color = '#EBEBEB', className, ...props }) => {
    return (
        <div style={{ background: color }} className={twMerge('px-2.5 py-0.5 rounded-full', className)} {...props}>
            {children}
        </div>
    )
}

export default Chips;