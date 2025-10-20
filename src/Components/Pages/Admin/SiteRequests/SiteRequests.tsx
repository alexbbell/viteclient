// @flow 
import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { settings } from '../../../../config';
import type { IConsultForm } from '../../../ConsultForm';
import { Modal, Table, type TableProps } from 'antd';
import { Link } from 'react-router-dom';



export interface IConsultFormDto extends IConsultForm {
    id: number;
    theName: string;
    created: Date;
    status: string;
}

type PaginatedResponse = {
    items: IConsultFormDto[],
    totalCount: number
};




export const SiteRequests = () => {

    const [page, setPage] = React.useState(0)
    const itemsPerPage = 10
    const lsTokens: string | null = localStorage.getItem('userToken')
    const tkns = JSON.parse(lsTokens ?? '{}')
    
    // Modal window
    const [open, setOpen] = React.useState<boolean>(false)
    const [modalText, setModalText] = React.useState('Content of the modal');
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const fetchRecords = async (_page = 0): Promise<PaginatedResponse> => {
        try {
            const res = await fetch(`${settings.apiUrl}SiteRequests/getitems/?page=${_page}`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tkns?.accessToken}`
                }
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            const data: PaginatedResponse = await res.json();
            console.log('data', data)
            return {
                totalCount: data.totalCount,   // you may want logic to check if more pages exist
                items: data.items
            };
        } catch (error) {
            console.error(error)
            return {
                totalCount: 0,
                items: []
            };
        }
    };

    const columns: TableProps<IConsultFormDto>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Created', 'dataIndex': 'created', 'key': 'created' },
    { title: 'Status', 'dataIndex': 'status', 'key': 'status' },
    { title: 'Title', 'dataIndex': 'status', 'key': 'theName' },
    {
        title: 'Action', 'dataIndex': 'id',
        render: (id: string) => {
            return <button onClick={ () => {
               setOpen(true)
            }}>Process</button>
        }
    }
]
    const { isPending, isError, error, data, isFetching } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => fetchRecords(page),
        // placeholderData: keepPreviousData
    });

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    }

        const handleCancel = () => {
            console.log('Clicked cancel button');
            setOpen(false);
        };


    if (isPending) return <p>Pending...</p>;
    if (isFetching) return <p>Fetching...</p>;
    if (isError) return <p>Error on load {error.message}</p>;


    return (
        <div>


            <h2>SiteRequests</h2>
{String(isPending) }
{String(isFetching) }
            {!isPending && !isFetching && !isError && data.totalCount > 0 &&


                <Table dataSource={data.items} columns={columns}
                    loading={isFetching}                 // <= don’t unmount the Table while fetching
                    pagination={{
                        position: ['bottomRight'],  // or ['bottomRight'], ['topLeft'], etc.
                        pageSize: itemsPerPage,            // number of rows per page
                        showSizeChanger: true,   // allow users to change page size
                        total: data.totalCount,
                        showQuickJumper: true,   // jump to page input

                        onChange: (pageNumber: number) => {
                            setPage(pageNumber)
                        }
                    }}
                />
            }

            <span>Current Page: {page + 1}</span>
            {isFetching ? <span> Loading...</span> : null}
            

                        <Modal open={open} 
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                    Tesxt {modalText}
                </Modal>
        </div>
    );
};

