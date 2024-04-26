import React, { useMemo, useEffect, useRef } from 'react'

export default function GameUI({
    score,
    gameState,
    onChangeGameState,
    tapKeyDown,
    tapKeyUp,
}) {
    const styleData = useMemo(() => {
        return {
            score: {
                position: 'absolute',
                top: '12px',
                right: 0,
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
                cursor: 'pointer',
                boxSizing: 'border-box',
                border: '1px solid #aaa',
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
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                lineHeight: '40px',
                textAlign: 'center',
                color: '#2E1437',
                margin: '4px',
                padding: '8px',
                pointerEvents: 'all',
                userSelect: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box',
                border: '1px solid #aaa',
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
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                border: '1px solid #aaa',
            },

            right: {
                position: 'absolute',
                top: '50%',
                right: '12px',
                width: '24px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '0 2px 0 10px',
                transform: 'translateY(-50%) rotate(180deg)',
                pointerEvents: 'all',
                userSelect: 'none',
                cursor: 'pointer',
                border: '1px solid #aaa',
            },

            start: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                font: '60px Comic Sans MS',
                fontWeight: 700,
                color: '#f7235b',
                // backgroundColor: 'rgba(255, 255, 255, 0.3)',
                // boxShadow: '0 0 4px 4px 4px #fff',
                padding: '4px 12px',
                pointerEvents: 'all',
                cursor: 'pointer',

            },

            pause: {
                position: 'absolute',
                top: '12px',
                left: 0, 
                padding: '16px',
                pointerEvents: 'all',
                cursor: 'pointer',
            }
        }
    }, [])

    const onTapButton = (e) => {
        const keyCode = e.currentTarget.dataset.keycode
        const shiftKey = e.currentTarget.dataset.shiftkey
        tapKeyDown({ keyCode, shiftKey })
    }

    const handleKeyDown = (e) => {
        switch (e.keyCode) {
            case 87:
                wButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                break;
            case 65:
                aButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                break;
            case 83:
                sButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                break;
            case 68:
                dButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                break;
            case 38:
                upButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                break;
            case 40:
                downButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                break;
            case 37:
                if (e.shiftKey) {
                    lastPageButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                } else {
                    leftButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                }
                break;
            case 39:
                if (e.shiftKey) {
                    nextPageButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                } else {
                    rightButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                }
                break;
            default:
                break;
        }
    }

    const handleKeyUp = (e) => {
        switch (e.keyCode) {
            case 87:
                wButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 65:
                aButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 83:
                sButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 68:
                dButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 38:
                upButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 40:
                downButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 37:
                leftButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 39:
                rightButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            case 16:
                lastPageButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                nextPageButton.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [])

    const wButton = useRef()
    const aButton = useRef()
    const sButton = useRef()
    const dButton = useRef()
    const upButton = useRef()
    const downButton = useRef()
    const leftButton = useRef()
    const rightButton = useRef()
    const lastPageButton = useRef()
    const nextPageButton = useRef()

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', userSelect: 'none', }}>
            <div style={styleData.score}>{score}</div>
            <div style={styleData.wasd}>
                <span ref={wButton} style={styleData.button} data-keycode="87" onClick={onTapButton}>W</span>
                <div style={{ display: 'flex' }}>
                    <span ref={aButton} style={styleData.button} data-keycode="65" onClick={onTapButton}>A</span>
                    <span ref={sButton} style={styleData.button} data-keycode="83" onClick={onTapButton}>S</span>
                    <span ref={dButton} style={styleData.button} data-keycode="68" onClick={onTapButton}>D</span>
                </div>
            </div>
            <div style={styleData.arrows}>
                <div ref={upButton} style={styleData.arrow} data-keycode="38" onClick={onTapButton}>
                    <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M0 768 512 256 1024 768Z" fill="#2E1437" /></svg>
                </div>
                <div style={{ display: 'flex' }}>
                    <div ref={leftButton} style={styleData.arrow} data-keycode="37" onClick={onTapButton}>
                        <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M768 0 256 512 768 1024Z" fill="#2E1437" /></svg>
                    </div>
                    <div ref={downButton} style={styleData.arrow} data-keycode="40" onClick={onTapButton}>
                        <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M0 256 512 768 1024 256Z" fill="#2E1437" /></svg>
                    </div>
                    <div ref={rightButton} style={styleData.arrow} data-keycode="39" onClick={onTapButton}>
                        <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M256 0 768 512 256 1024Z" fill="#2E1437" /></svg>
                    </div>
                </div>
            </div>
            <div ref={lastPageButton} style={styleData.left} title="shift + ◀︎">
                <svg viewBox="0 0 1024 1024" width="24" height="40" data-keycode="37" data-shiftkey={true} onClick={onTapButton}><path d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z" fill="#2E1437" /></svg>
            </div>
            <div ref={nextPageButton} style={styleData.right} title="shift + ▶︎">
                <svg viewBox="0 0 1024 1024" width="24" height="40" data-keycode="39" data-shiftkey={true} onClick={onTapButton}><path d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z" fill="#2E1437" /></svg>
            </div>
            {
                gameState == 0 ?
                    <div style={styleData.start} onClick={() => { onChangeGameState(1) }} title="Space">START</div> :
                    gameState == 2 ?
                        <div style={styleData.pause} onClick={() => { onChangeGameState(1) }} title="Space">
                            <svg viewBox="0 0 1024 1024" width="40" height="40"><path d="M256 0 880 512 256 1024Z" fill="#e6e6e6" /></svg>
                        </div> : <div style={styleData.pause} onClick={() => { onChangeGameState(2) }}>
                            <svg viewBox="0 0 1024 1024" version="1.1" p-id="5889" width="40" height="40"><path d="M191.397656 128.194684l191.080943 0 0 768.472256-191.080943 0 0-768.472256Z" fill="#e6e6e6" p-id="5890" /><path d="M575.874261 128.194684l192.901405 0 0 768.472256-192.901405 0 0-768.472256Z" fill="#e6e6e6" p-id="5891" /></svg>
                        </div>
            }
        </div>
    )
}
