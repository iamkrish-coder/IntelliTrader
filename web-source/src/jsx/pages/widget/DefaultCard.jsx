import React from 'react';

const DefaultCard = (props) => {
    return (
        <div className="media ai-icon">
            <span className={`me-3 bell icon-bell-effect text-${props.color} bgl-${props.color}`}>
                {props.icon}
            </span>
            <div className="media-body">
                <p className="mb-1">{props.title}</p>
                <h4 className="mb-0">{props.number}</h4>{" "}
                <span className={`badge badge-${props.color}`}>{props.percent}</span>
            </div>
        </div>
    );
};

const BgCard = (props) =>{
    return(
        <div className="media">
            <span className="me-3">
                {props.icon}
            </span>
            <div className="media-body text-white">
                <p className="mb-1 text-white">{props.title}</p>
                <h3 className="text-white">{props.number}</h3>
                <div className={`progress mb-2 bg-${props.color}`}>
                    <div className="progress-bar progress-animated bg-white" style={{width: props.percent}}></div>
                </div>
                <small>{props.percent} Increase in 20 Days</small>
            </div>
        </div>
    )
}

const SocialCard = (props) =>{
    return(
        <div className="card">
            <div className={`social-graph-wrapper widget-${props.color}`}>
                <span className="s-icon">
                    <i className={props.icon} />
                </span>
            </div>
            <div className="row">
                <div className="col-6 border-end">
                    <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1"><span className="counter">{props.friends}</span> k</h4>
                        <p className="m-0">Friends</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 className="m-1"><span className="counter">{props.followers}</span> k</h4>
                        <p className="m-0">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {BgCard, SocialCard};
export default DefaultCard;