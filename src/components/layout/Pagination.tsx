import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.sm};
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
`;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        // First page
        buttons.push(
            <PageButton
                key="first"
                onClick={() => onPageChange(1)}
                active={currentPage === 1}
            >
                1
            </PageButton>
        );

        // Second page
        buttons.push(
            <PageButton
                key="second"
                onClick={() => onPageChange(2)}
                active={currentPage === 2}
            >
                2
            </PageButton>
        );

        // Ellipsis if current page is greater than 3
        if (currentPage > 3) {
            buttons.push(<Ellipsis key="ellipsis1">...</Ellipsis>);
        }

        // Current page and surrounding pages
        for (let i = Math.max(3, currentPage - 1); i <= Math.min(5, currentPage + 1); i++) {
            if (i !== 1 && i !== 2) { // Skip 1 and 2 as they're already added
                buttons.push(
                    <PageButton
                        key={i}
                        onClick={() => onPageChange(i)}
                        active={currentPage === i}
                    >
                        {i}
                    </PageButton>
                );
            }
        }

        // Ellipsis if current page is less than 4
        if (currentPage < 4) {
            buttons.push(<Ellipsis key="ellipsis2">...</Ellipsis>);
        }

        return buttons;
    };

    return (
        <PaginationContainer>
            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </PageButton>
            {renderPaginationButtons()}
            <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination; 