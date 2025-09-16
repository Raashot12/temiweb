import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  ActionIcon,
  Menu,
  Badge,
  Grid,
  Button,
  Group,
} from '@mantine/core';
import { IconDots, IconEye, IconFileTypePdf } from '@tabler/icons-react';
import { appColors } from '@/theme/colors';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';

// Mock data for investigations with ready results
const mockRecentResults = [
  {
    id: 1,
    investigationName: 'Full Blood Count (FBC)',
    status: 'Report Ready',
    completedDate: '2024-01-15T10:30:00Z',
    specimen: 'Blood',
    result: `
      <h3>Full Blood Count Results</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        <tr style="background: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Result</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Reference Range</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Hemoglobin</td>
          <td style="border: 1px solid #ddd; padding: 8px;">14.2 g/dL</td>
          <td style="border: 1px solid #ddd; padding: 8px;">12.0-16.0 g/dL</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">White Blood Cells</td>
          <td style="border: 1px solid #ddd; padding: 8px;">7.5 × 10³/μL</td>
          <td style="border: 1px solid #ddd; padding: 8px;">4.0-11.0 × 10³/μL</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Platelets</td>
          <td style="border: 1px solid #ddd; padding: 8px;">250 × 10³/μL</td>
          <td style="border: 1px solid #ddd; padding: 8px;">150-450 × 10³/μL</td>
        </tr>
      </table>
      <p><strong>Interpretation:</strong> All parameters are within normal limits.</p>
    `,
  },
  {
    id: 2,
    investigationName: 'Liver Function Test',
    status: 'Report Ready',
    completedDate: '2024-01-14T14:20:00Z',
    specimen: 'Serum',
    result: `
      <h3>Liver Function Test Results</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        <tr style="background: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Result</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Reference Range</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">ALT</td>
          <td style="border: 1px solid #ddd; padding: 8px;">28 U/L</td>
          <td style="border: 1px solid #ddd; padding: 8px;">7-56 U/L</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">AST</td>
          <td style="border: 1px solid #ddd; padding: 8px;">32 U/L</td>
          <td style="border: 1px solid #ddd; padding: 8px;">10-40 U/L</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Bilirubin (Total)</td>
          <td style="border: 1px solid #ddd; padding: 8px;">1.1 mg/dL</td>
          <td style="border: 1px solid #ddd; padding: 8px;">0.3-1.2 mg/dL</td>
        </tr>
      </table>
      <p><strong>Interpretation:</strong> Liver function parameters are normal.</p>
    `,
  },
  {
    id: 3,
    investigationName: 'Chest X-Ray',
    status: 'Report Ready',
    completedDate: '2024-01-13T09:15:00Z',
    specimen: 'Radiological',
    result: `
      <h3>Chest X-Ray Report</h3>
      <p><strong>Technique:</strong> PA and lateral chest radiographs</p>
      <p><strong>Findings:</strong></p>
      <ul>
        <li>The lungs are clear bilaterally with no evidence of consolidation, pleural effusion, or pneumothorax</li>
        <li>The cardiac silhouette is normal in size and configuration</li>
        <li>The mediastinal contours are unremarkable</li>
        <li>No acute bony abnormalities are identified</li>
      </ul>
      <p><strong>Impression:</strong> Normal chest radiograph. No acute cardiopulmonary abnormalities.</p>
    `,
  },
];

interface RecentResultsProps {
  patientId: number;
  encounterId: string;
  procedureId?: number;
  toggleClose?: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: { color: string; bg: string } } = {
    'Report Ready': { color: '#9B51E0', bg: '#F3E5F5' },
    'Result Ready': { color: '#27AE60', bg: '#E2F8EB' },
  };
  return statusColors[status] || { color: '#6C757D', bg: '#F8F9FA' };
};

const RecentResults: React.FC<RecentResultsProps> = ({
  patientId,
  encounterId,
}) => {
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const handleViewResult = (investigation: any) => {
    setSelectedResult(investigation);
    setViewModalOpened(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpened(false);
    setSelectedResult(null);
  };

  const handleDownloadResult = async (investigation: any) => {
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      // Create a temporary container for the report content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '210mm';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '20px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';

      // Generate report content
      tempContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">LABORATORY REPORT</h1>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 20px; background: #e3f2fd; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px;">Test Information</h3>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Investigation:</strong> ${investigation.investigationName}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Specimen:</strong> ${investigation.specimen || 'N/A'}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Status:</strong> ${investigation.status}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Completed Date:</strong> ${formatDate(investigation.completedDate)}</p>
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="margin: 0 0 15px 0; font-size: 18px;">Test Results</h3>
          <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; background: #fff;">
            ${investigation.result}
          </div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;">This report was generated electronically and is valid without signature.</p>
          <p style="margin: 5px 0;">Report ID: ${investigation.id}</p>
        </div>
      `;

      document.body.appendChild(tempContainer);

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const margin = 15;
      const imgWidth = 210 - margin * 2;
      const pageHeight = 297 - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = margin - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${investigation.investigationName}_Result.pdf`.replace(
        /[^a-zA-Z0-9]/g,
        '_',
      );
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <Box
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        marginTop: '10px',
      }}
    >
      <Text size="lg" fw={600} mb="lg" c={appColors.black}>
        Recent Results ({mockRecentResults.length})
      </Text>

      {mockRecentResults.length === 0 ? (
        <Box
          style={{
            textAlign: 'center',
            padding: '40px',
            color: appColors.lowerText,
          }}
        >
          <Text size="md">No recent results available</Text>
        </Box>
      ) : (
        <Box>
          {mockRecentResults.map((investigation) => (
            <Box
              key={investigation.id}
              style={{
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#FAFAFA',
              }}
            >
              <Flex justify="space-between" align="center">
                <Box style={{ flex: 1 }}>
                  <Text size="md" fw={600} mb="xs" c={appColors.black}>
                    {investigation.investigationName}
                  </Text>
                  <Flex align="center" gap="md">
                    <Badge
                      size="sm"
                      style={{
                        backgroundColor: getStatusColor(investigation.status)
                          .bg,
                        color: getStatusColor(investigation.status).color,
                      }}
                    >
                      {investigation.status}
                    </Badge>
                    <Text size="sm" c={appColors.lowerText}>
                      Completed: {formatDate(investigation.completedDate)}
                    </Text>
                    <Text size="sm" c={appColors.lowerText}>
                      Specimen: {investigation.specimen}
                    </Text>
                  </Flex>
                </Box>

                <Menu shadow="md" width={180}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconThreeDots />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconEye size={14} />}
                      onClick={() => handleViewResult(investigation)}
                    >
                      View Result
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconFileTypePdf size={14} />}
                      onClick={() => handleDownloadResult(investigation)}
                    >
                      Download Result
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </Box>
          ))}
        </Box>
      )}

      {/* View Result Modal */}
      <ModalLayoutWrapper
        open={viewModalOpened}
        title={
          <Flex justify="space-between" align="center">
            <Box>
              <Text fw={600}>Test Result</Text>
              <Text c="dimmed" size="sm">
                {selectedResult?.investigationName}
              </Text>
            </Box>
            <IconCloseModal handleClose={handleCloseViewModal} />
          </Flex>
        }
        size="85"
        footer={
          <Group justify="flex-end" mt="sm">
            <Button variant="light" onClick={handleCloseViewModal}>
              Close
            </Button>
            <Button
              leftSection={<IconFileTypePdf size={16} />}
              onClick={() =>
                selectedResult && handleDownloadResult(selectedResult)
              }
            >
              Download PDF
            </Button>
          </Group>
        }
      >
        <Box mt={15}>
          <Box
            id="result-content"
            bg="white"
            p="md"
            style={{ borderRadius: '10px' }}
          >
            {/* Result Header */}
            <div className="header">
              <Text size="xl" fw={700} mb="xs">
                TEST RESULT
              </Text>
              <Text size="sm" c="dimmed">
                Completed on{' '}
                {selectedResult && formatDate(selectedResult.completedDate)}
              </Text>
            </div>

            {/* Test Information */}
            <Box
              style={{
                marginBottom: '20px',
                background: '#e3f2fd',
                padding: '15px',
                borderRadius: '5px',
              }}
            >
              <Text size="lg" fw={600} mb="md">
                Test Information
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Investigation:</strong>{' '}
                    {selectedResult?.investigationName}
                  </Text>
                  <Text size="sm">
                    <strong>Specimen:</strong>{' '}
                    {selectedResult?.specimen || 'N/A'}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm">
                    <strong>Status:</strong> {selectedResult?.status}
                  </Text>
                  <Text size="sm">
                    <strong>Completed:</strong>{' '}
                    {selectedResult && formatDate(selectedResult.completedDate)}
                  </Text>
                </Grid.Col>
              </Grid>
            </Box>

            {/* Test Results */}
            <Box style={{ marginTop: '20px' }}>
              <Text size="lg" fw={600} mb="md">
                Results
              </Text>
              <Box
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#fff',
                }}
                dangerouslySetInnerHTML={{
                  __html: selectedResult?.result || '',
                }}
              />
            </Box>
          </Box>
        </Box>
      </ModalLayoutWrapper>
    </Box>
  );
};

export default RecentResults;
