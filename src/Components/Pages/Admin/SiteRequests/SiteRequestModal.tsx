// @flow 
import * as React from 'react';
import { settings } from '../../../../config';
import { defaultIConsultFormDto, type IConsultFormDto } from '../../../../interfaces';
type Props = {
    id: number
};
export const SiteRequestModal = (props: Props) => {
    const lsTokens: string | null = localStorage.getItem('userToken')
    const tkns = JSON.parse(lsTokens ?? '{}')
    const [requestData, setRequestData] = React.useState<IConsultFormDto>(defaultIConsultFormDto);
        const fetchRecords = async (id:number): Promise<IConsultFormDto> => {
            try {
                const res = await fetch(`${settings.apiUrl}SiteRequests/${id}`, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tkns?.accessToken}`
                    }
                });
    
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
    
                const data:IConsultFormDto = await res.json();
                console.log('data', data)
                return data;
            } catch (error) {
                console.error(error)
                return defaultIConsultFormDto;
            }
        };

        React.useEffect(() => {
            fetchRecords(props.id).then(data => {
                setRequestData(data);
            } ).catch(error => {
                console.error(error);
            })}
            , [props.id]);

    return (
        <div>
            {props.id}
            
            
            Name: {requestData.theName}
            <br />
            Email: {requestData.email}
            <br />
            Question: {requestData.question}
            <br />
            Text: { (requestData.created) ? requestData.created.toString() : '' }
        </div>
    );
};