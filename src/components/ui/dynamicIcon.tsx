import * as IconsFa from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useEffect, useState } from 'react';

type IconSets = {
    [set:string]: {
        [iconName: string]: IconType;
    };
};

const iconSets: IconSets = {
    'fa': IconsFa,
}

interface DynamicIconProps extends React.SVGProps<SVGSVGElement>{
    icon: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, ...props }) => {
    const [IconComponent, setIconComponent] = useState<IconType | null>(null);

    useEffect(() => {
        const load = async () => {
            const [iconPackage, name] = icon.split('/');
            const iconSet = iconSets[iconPackage.toLowerCase()];

            if (iconSet && name in iconSet){
                setIconComponent(() => iconSet[name]);
            }else{
                setIconComponent(() => IconsFa['FaExclamationTriangle']);
            }
        }

        load();
    }, [icon]);

    if (!IconComponent) {
        return null;
      }

    return <IconComponent {...props}/>;
}

export default DynamicIcon;