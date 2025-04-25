import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    tabs: { id: string; label: string }[];
}

const Tabs = ({ activeTab, onTabChange, tabs }: TabsProps) => {
    return (
        <TabsContainer>
            {tabs.map(tab => (
                <Tab
                    key={tab.id}
                    isActive={activeTab === tab.id}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </Tab>
            ))}
        </TabsContainer>
    );
};

export default Tabs; 