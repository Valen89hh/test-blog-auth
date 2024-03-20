interface ContainerProps {
    children: React.ReactNode,
    className?: string
}

const Container: React.FC<ContainerProps> = ({
    children,
    className = ""
}) => {
    return (
        <div className={`container mx-auto px-3 ${className}`}>
            {children}
        </div>
    );
}

export default Container;