import defaultAvatar from './assets/avatar-default.svg'

type AvatarProps = {
    readonly src?: string,
    readonly name?: string,
    readonly size?: "sm" | "md"| "lg"
}

const SIZES = {
    sm: 32,
    md: 40,
    lg: 56
}

export default function Avatar({src, name, size = "md"}: AvatarProps){

    const px = SIZES[size];
    const initials = getInitials(name);

    let content: React.ReactNode;
    const altText = name? `${name}'s avatar` : "User avatar";

    if(src){
        content = <img src={src} alt={altText} />
    }
    else if(initials){
        content = 
            <>
                <span aria-hidden="true">{initials}</span>
                <span className="sr-only">{altText}</span>
            </>
    }
    else {
        content = <img src={defaultAvatar} alt={altText} />
    }

    return(
        <div className="avatar" style={{width: px, height: px}}>
                {content}
        </div>
    )
}

function getInitials(name?: string){
    if(!name) return null;
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1){
        return parts[0].substring(0,2).toUpperCase();
    }
    return ((parts[0][0] + parts.at(-1)![0]).toUpperCase());
}