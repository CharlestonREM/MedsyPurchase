import React from 'react'

export interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...rest }): JSX.Element | null => {
    const ImportedIconRef = React.useRef<
        React.FC<React.SVGProps<SVGSVGElement>>
    >();
    const [loading, setLoading] = React.useState(false);

    React.useEffect((): void => {
        setLoading(true);
        const importIcon = async (): Promise<void> => {
            try {

                ImportedIconRef.current = (await import(`@material-ui/icons/${name}`)).ReactComponent;
            } catch (err) {
                // Your own error handling logic, throwing error for the sake of
                // simplicity
                throw err;
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name]);

    if (!loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef;
        return <ImportedIcon {...rest} />;
    }

    return null;
};


export default DynamicIcon;


