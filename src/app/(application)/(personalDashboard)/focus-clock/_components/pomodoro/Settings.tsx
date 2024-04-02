import ReactSlider from 'react-slider';
import SettingsContext from "./SettingsContext";
import { useContext } from "react";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SettingsInfo {
    workMinutes: number;
    breakMinutes: number;
    setWorkMinutes: (newValue: number) => void;
    setBreakMinutes: (newValue: number) => void;
    setShowSettings: (newValue: boolean) => void;
  }
  
function Settings() {
    const settingsInfo = useContext(SettingsContext) as SettingsInfo;;
    return (
        <div style={{ textAlign: 'left' }} className="w-full border px-10 flex gap-10 flex-col py-10">
            <div className='flex flex-col gap-2'>
                <Label className='font-medium text-xl'>work: {settingsInfo.workMinutes}:00</Label>
                <ReactSlider
                    className={'h-10 border border-red-500 rounded-md'}
                    thumbClassName={'pointer w-10 h-10 rouned-lg bg-red-400 rounded-full'}
                    trackClassName={'track'}
                    value={settingsInfo.workMinutes}
                    onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                    min={1}
                    max={120}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <Label className='font-medium text-xl'>break: {settingsInfo.breakMinutes}:00</Label>
                <ReactSlider
                    className={'h-10 border border-green-500 rounded-md'}
                    thumbClassName={'pointer w-10 bg-green-400 h-10 rounded-full'}
                    trackClassName={'bg-green-500'}
                    value={settingsInfo.breakMinutes}
                    onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                    min={1}
                    max={120}
                />
            </div>
            <div
                className="text-center mt-10"
            >
                <Button
                    className='flex gap-2 items-center'
                    onClick={() => settingsInfo.setShowSettings(false)}
                >
                    <ArrowLeft className='h-4 w-4' />
                    <span>
                        Back
                    </span>
                </Button>
            </div>

        </div>
    );
}

export default Settings;