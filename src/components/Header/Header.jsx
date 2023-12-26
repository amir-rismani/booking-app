import { HiLocationMarker, HiCalendar, HiOutlineSearch, HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import "./Header.css"
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
function Header() {
    const [destination, setDestination] = useState("");
    const [showGuestOption, setShowGuestOption] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

    const handleCount = (type, operation) => {
        setOptions((prevOptions) => {
            return {
                ...prevOptions,
                [type]: operation === 'inc' ? prevOptions[type] + 1 : prevOptions[type] - 1
            }
        })
    }

    return (
        <div className='header'>
            <div className="searchbar">
                <div className="searchbar__item">
                    <HiLocationMarker className="searchbar__icon location" />
                    <input className="searchbar__input" value={destination} onChange={(ev) => setDestination(ev.target.value)} type="text" placeholder="Where to go?" id="destination" name="destination" />
                </div>
                <span className="separator"></span>
                <div className="searchbar__item">
                    <HiCalendar className="searchbar__icon calendar" />
                    <span>08/30/2023 to 08/30/2023</span>
                </div>
                <span className="separator"></span>
                <div className="searchbar__item">
                    <div className="guest">
                        <span id="guest-label" className="guest__label" onClick={() => setShowGuestOption(is => !is)}>{options.adult} adult &bull; {options.children} children &bull; {options.room} room</span>
                        {showGuestOption && <GuestOptionList options={options} onChangeCount={handleCount} setShowGuestOption={setShowGuestOption} />}
                    </div>
                </div>
                <div className="searchbar__item">
                    <button className="searchbar__button"><HiOutlineSearch className="searchbar__icon search" /></button>
                </div>
            </div>
        </div>
    )
}

export default Header

const GuestOptionList = ({ options, onChangeCount, setShowGuestOption }) => {
    const guestOptionRef = useRef();
    useOutsideClick(guestOptionRef, 'guest-label', () => setShowGuestOption(false));
    return (
        <div className="guest__option" ref={guestOptionRef}>
            <GuestOptionItem type="adult" options={options} onChangeCount={onChangeCount} minLimit={1} />
            <GuestOptionItem type="children" options={options} onChangeCount={onChangeCount} minLimit={0} />
            <GuestOptionItem type="room" options={options} onChangeCount={onChangeCount} minLimit={1} />
        </div>
    );
}

const GuestOptionItem = ({ options, type, onChangeCount, minLimit }) => {
    return (
        <div className="option-item">
            <span className="option-item__label">{type.at(0).toUpperCase() + type.slice(1)}</span>
            <div className="option-item__counter">
                <button className="counter-button" disabled={options[type] <= minLimit} onClick={() => onChangeCount(type, 'dec')}><HiOutlineMinusSm /></button>
                <span className="counter-number">{options[type]}</span>
                <button className="counter-button" onClick={() => onChangeCount(type, 'inc')}><HiOutlinePlusSm /></button>
            </div>
        </div>
    );
}