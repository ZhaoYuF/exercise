import React, { useMemo } from 'react'

export default function GameUI({
    score = 0,
    gameState,
    onChangeGameState,
    onKeyDown,
    onKeyUp,
}) {
    const styleData = useMemo(() => {
        return {
            score: {
                position: 'absolute',
                top: 0,
                left: 0,
                padding: '16px',
                font: '36px Comic Sans MS',
                color: '#f7235b',
            },
            wasd: {
                position: 'absolute',
                left: '12px',
                bottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            },
            button: {
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                lineHeight: '40px',
                textAlign: 'center',
                color: '#2E1437',
                margin: '4px',
                pointerEvents: 'all',
                userSelect: 'none',
            },
            arrows: {
                position: 'absolute',
                right: '12px',
                bottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            },
            arrow: {
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                lineHeight: '40px',
                textAlign: 'center',
                color: '#2E1437',
                margin: '4px',
                padding: '8px',
                pointerEvents: 'all',
                userSelect: 'none',
            },

            left: {
                position: 'absolute',
                top: '50%',
                left: '12px',
                width: '24px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '0 2px 0 10px',
                pointerEvents: 'all',
                userSelect: 'none',
            },

            right: {
                position: 'absolute',
                top: '50%',
                right: '12px',
                width: '24px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '0 2px 0 10px',
                transform: 'rotate(180deg)',
                pointerEvents: 'all',
                userSelect: 'none',
            },

            start: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                font: '44px Comic Sans MS',
                color: '#f7235b',
                // backgroundColor: 'rgba(255, 255, 255, 0.3)',
                // boxShadow: '0 0 4px 4px 4px #fff',
                padding: '4px 12px',
                pointerEvents: 'all',

            }
        }
    }, [])

    const onTapButton = (e) => {
        // console.log(e);
        const keyCode = e.currentTarget.dataset.keycode
        const shiftKey = e.currentTarget.dataset.shiftkey
        onKeyDown({ keyCode, shiftKey })
    }

    //  //action:2 倍速
    //  '13': { key: 0, action: 2 }, //回车
    //  //空格暂停
    //  '32': { key: 0, action: 3 },

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <div style={styleData.score}>{score > 0 ? score : ''}</div>
            <div style={styleData.wasd}>
                <span style={styleData.button} data-keycode="87" onClick={onTapButton}>W</span>
                <div style={{ display: 'flex' }}>
                    <span style={styleData.button} data-keycode="65" onClick={onTapButton}>A</span>
                    <span style={styleData.button} data-keycode="83" onClick={onTapButton}>S</span>
                    <span style={styleData.button} data-keycode="68" onClick={onTapButton}>D</span>
                </div>
            </div>
            <div style={styleData.arrows}>
                <div style={styleData.arrow} data-keycode="38" onClick={onTapButton}>
                    <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M0 768 512 256 1024 768Z" fill="#2E1437" /></svg>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={styleData.arrow} data-keycode="37" onClick={onTapButton}>
                        <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M768 0 256 512 768 1024Z" fill="#2E1437" /></svg>
                    </div>
                    <div style={styleData.arrow} data-keycode="40" onClick={onTapButton}>
                        <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M0 256 512 768 1024 256Z" fill="#2E1437" /></svg>
                    </div>
                    <div style={styleData.arrow} data-keycode="39" onClick={onTapButton}>
                        <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M256 0 768 512 256 1024Z" fill="#2E1437" /></svg>
                    </div>
                </div>
            </div>
            <div style={styleData.left}>
                <svg viewBox="0 0 1024 1024" width="24" height="40" data-keycode="37" data-shiftkey={true} onClick={onTapButton}><path d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z" fill="#2E1437" /></svg>
            </div>
            <div style={styleData.right}>
                <svg viewBox="0 0 1024 1024" width="24" height="40" data-keycode="39" data-shiftkey={true} onClick={onTapButton}><path d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z" fill="#2E1437" /></svg>
            </div>
            {
                gameState == 0 ?
                <div style={styleData.start} onClick={() => {onChangeGameState(1)}}>START</div> :
                gameState == 2 ? 
                <div style={styleData.start} onClick={() => {onChangeGameState(1)}}>
                    <svg viewBox="0 0 1024 1024" width="44" height="44"><path d="M256 0 880 512 256 1024Z" fill="#2E1437" /></svg>
                </div> : null
            } 
        </div>
    )
}
