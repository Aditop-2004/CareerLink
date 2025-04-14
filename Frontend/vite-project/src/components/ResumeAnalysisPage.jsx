import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { use } from "react";
import { useSelector } from "react-redux";

const ResumeAnalysis = () => {
  const data = useSelector((state) => state.resumeAnalysis.resumeAnalysis);

  const handleDownload = () => {
    // placeholder for download logic
    alert("PDF download triggered");
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold mb-2">{data.personal_info.name}</h2>
          <p className="text-gray-700">Email: {data.personal_info.email}</p>
          <p className="text-gray-700">Phone: {data.personal_info.phone}</p>
          <div className="mt-4 text-xl font-semibold">
            Resume Score:{" "}
            <span className="text-blue-600">{data.resume_score}/100</span>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible>
        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2">
              {data.education.map((edu, i) => (
                <li key={i}>{edu}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">
              Career Recommendations
            </h3>
            {data.recommendations.career.map((role, i) => (
              <div key={i} className="mb-3">
                <p className="font-bold">{role.title}</p>
                <p className="text-gray-700 text-sm">{role.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Suggested Courses</h3>
            {data.recommendations.courses.map((course, i) => (
              <a
                key={i}
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 text-blue-600 hover:underline"
              >
                {course.course_name} ({course.platform})
              </a>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Resume Tips</h3>
          <ul className="list-disc pl-5 space-y-2">
            {data.recommendations.resume_tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Skills Found</h3>
            <p className="font-medium">Soft Skills:</p>
            <div className="flex flex-wrap gap-2 my-2">
              {data.skills.found.soft_skills.map((skill, i) => (
                <Badge key={i}>{skill}</Badge>
              ))}
            </div>
            <p className="font-medium">Technical Skills:</p>
            <div className="flex flex-wrap gap-2 my-2">
              {data.skills.found.technical_skills.map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Skills to Develop</h3>
            <TooltipProvider>
              <div className="flex flex-wrap gap-2">
                {data.recommendations.skills_to_develop.map((skill, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <Badge variant="destructive">{skill}</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Important for modern dev roles</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
      <Button className="mt-6" variant="outline" onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" /> Download PDF
      </Button>
    </div>
  );
};

export default ResumeAnalysis;
