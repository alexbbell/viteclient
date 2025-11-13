// @flow 
import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { settings } from '../../../../config';
import { Button, Modal, Table, type TableProps } from 'antd';
import { SiteRequestModal } from './SiteRequestModal';
import type { IConsultFormDto, PaginatedResponse } from '../../../../interfaces';





export const SiteRequests = () => {

    const [page, setPage] = React.useState(0)
    const itemsPerPage = 10
    const lsTokens: string | null = localStorage.getItem('userToken')
    const tkns = JSON.parse(lsTokens ?? '{}')
    
    // Modal window
    const [open, setOpen] = React.useState<boolean>(false)
    const [modalText, setModalText] = React.useState('Content of the modal');
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [selectedRequestId, setSelectedRequestId] = React.useState<number>(0);

    const [showDeleteDialog, setShowDeleteDialog] = React.useState<boolean>(false);
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
        render: (id: number) => {
            return <button onClick={ () => {
                setSelectedRequestId(id)
                setOpen(true)
               
            }}>Process {id}</button>
        }
    }
]
    const { isPending, isError, error, data, isFetching, refetch } = useQuery({
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

    const deleteItem = async (id:number) => {
        setModalText(`Are you sure want to delete the item ...${id}`);
     }

    const DeleteDialog = ():React.JSX.Element => {
        return (
            <div>
                <Button onClick={ ()=> {
                    setSelectedRequestId(0)
                    setOpen(false)
                } }>Cancel</Button>
                <Button onClick={ ()=> deleteItem(selectedRequestId) }>Delete</Button>
            </div>  
        )
    }

    const confirmDelete = async (id:number) => {
        try {
            const res = await fetch(`${settings.apiUrl}SiteRequests/${id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            setShowDeleteDialog(false);
             await refetch();

        } catch (error) {
            console.error(error)
        } finally {
            setShowDeleteDialog(false);
            setOpen(false);
        }
    }

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
                onCancel={handleCancel}
                  footer={(_, { OkBtn, CancelBtn }) => (
    <>
      {showDeleteDialog ? (
        // ---------- DELETE DIALOG FOOTER ----------
        <>
          <Button danger onClick={() => confirmDelete(selectedRequestId)}>
            Confirm delete
          </Button>
          <CancelBtn />
        </>
      ) : (
        // ---------- NORMAL FOOTER ----------
        <>
          {selectedRequestId > 0 && (
            <Button danger onClick={() => setShowDeleteDialog(true)}>
              Delete
            </Button>
          )}
          <CancelBtn />
          <OkBtn />
        </>
      )}
    </>
  )}

                >
                    {modalText}
                    <SiteRequestModal id={selectedRequestId} />
                    <DeleteDialog />
                </Modal>
        </div>
    );
};

